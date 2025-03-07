import uniqBy from 'lodash.uniqby';
import {
  MediaTypeObject,
  ReferenceObject,
  RequestBodyObject,
  ResponseObject,
} from 'openapi3-ts';
import { ContextSpecs } from '../../types';
import { ResReqTypesValue } from '../../types/resolvers';
import { pascal } from '../../utils/case';
import { isReference } from '../../utils/is';
import { getNumberWord } from '../../utils/string';
import { generateSchemaFormDataAndUrlEncoded } from '../generators/formData';
import { resolveObject } from '../resolvers/object';
import { resolveRef } from '../resolvers/ref';

const formDataContentTypes = ['multipart/form-data'];

const formUrlEncodedContentTypes = ['application/x-www-form-urlencoded'];

const getResReqContentTypes = ({
  mediaType,
  propName,
  context,
}: {
  mediaType: MediaTypeObject;
  propName?: string;
  context: ContextSpecs;
}) => {
  if (!mediaType.schema) {
    return undefined;
  }

  const resolvedObject = resolveObject({
    schema: mediaType.schema,
    propName,
    context,
  });

  return resolvedObject;
};

export const getResReqTypes = (
  responsesOrRequests: Array<
    [string, ResponseObject | ReferenceObject | RequestBodyObject]
  >,
  name: string,
  context: ContextSpecs,
  defaultType = 'unknown',
): ResReqTypesValue[] => {
  const typesArray = responsesOrRequests
    .filter(([_, res]) => Boolean(res))
    .map(([key, res]) => {
      if (isReference(res)) {
        const {
          schema: bodySchema,
          imports: [{ name, specKey, schemaName }],
        } = resolveRef<RequestBodyObject | ResponseObject>(res, context);

        const [contentType, mediaType] =
          Object.entries(bodySchema.content ?? {})[0] ?? [];

        const isFormData = formDataContentTypes.includes(contentType);
        const isFormUrlEncoded =
          formUrlEncodedContentTypes.includes(contentType);

        if ((!isFormData && !isFormUrlEncoded) || !mediaType?.schema) {
          return [
            {
              value: name,
              imports: [{ name, specKey, schemaName }],
              schemas: [],
              type: 'unknown',
              isEnum: false,
              isRef: true,
              originalSchema: mediaType?.schema,
              key,
              contentType,
            },
          ] as ResReqTypesValue[];
        }

        const formData = isFormData
          ? generateSchemaFormDataAndUrlEncoded({
              name,
              schemaObject: mediaType?.schema,
              context: {
                ...context,
                specKey: specKey || context.specKey,
              },
              isRef: true,
            })
          : undefined;

        const formUrlEncoded = isFormUrlEncoded
          ? generateSchemaFormDataAndUrlEncoded({
              name,
              schemaObject: mediaType?.schema,
              context: {
                ...context,
                specKey: specKey || context.specKey,
              },
              isUrlEncoded: true,
              isRef: true,
            })
          : undefined;

        return [
          {
            value: name,
            imports: [{ name, specKey, schemaName }],
            schemas: [],
            type: 'unknown',
            isEnum: false,
            formData,
            formUrlEncoded,
            isRef: true,
            originalSchema: mediaType?.schema,
            key,
            contentType,
          },
        ] as ResReqTypesValue[];
      }

      if (res.content) {
        const contents = Object.entries(res.content).map(
          ([contentType, mediaType], index, arr) => {
            let propName = key ? pascal(name) + pascal(key) : undefined;

            if (propName && arr.length > 1) {
              propName = propName + pascal(getNumberWord(index + 1));
            }

            const resolvedValue = getResReqContentTypes({
              mediaType,
              propName,
              context,
            });

            if (!resolvedValue) {
              return;
            }

            const isFormData = formDataContentTypes.includes(contentType);
            const isFormUrlEncoded =
              formUrlEncodedContentTypes.includes(contentType);

            if ((!isFormData && !isFormUrlEncoded) || !propName) {
              return { ...resolvedValue, contentType };
            }

            const formData = isFormData
              ? generateSchemaFormDataAndUrlEncoded({
                  name: propName,
                  schemaObject: mediaType.schema!,
                  context,
                })
              : undefined;

            const formUrlEncoded = isFormUrlEncoded
              ? generateSchemaFormDataAndUrlEncoded({
                  name: propName,
                  schemaObject: mediaType.schema!,
                  context,
                  isUrlEncoded: true,
                })
              : undefined;

            return {
              ...resolvedValue,
              formData,
              formUrlEncoded,
              contentType,
            };
          },
        );

        return contents
          .filter((x) => x)
          .map((x) => ({ ...x, key })) as ResReqTypesValue[];
      }

      return [
        {
          value: defaultType,
          imports: [],
          schemas: [],
          type: defaultType,
          isEnum: false,
          key,
          isRef: false,
          contentType: 'application/json',
        },
      ] as ResReqTypesValue[];
    });

  return uniqBy(
    typesArray.flatMap((it) => it),
    'value',
  );
};
