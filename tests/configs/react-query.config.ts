import { defineConfig } from 'orval';

export default defineConfig({
  basic: {
    output: {
      target: '../generated/react-query/basic/endpoints.ts',
      schemas: '../generated/react-query/basic/model',
      client: 'react-query',
      mock: true,
      headers: true,
    },
    input: {
      target: '../specifications/petstore.yaml',
    },
  },
  mutator: {
    output: {
      target: '../generated/react-query/mutator/endpoints.ts',
      schemas: '../generated/react-query/mutator/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'limit',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
      override: {
        transformer: '../transformers/add-version.js',
      },
    },
  },
  customClient: {
    output: {
      target: '../generated/react-query/mutator-client/endpoints.ts',
      schemas: '../generated/react-query/mutator-client/model',
      client: 'react-query',
      mock: true,
      headers: true,
      override: {
        mutator: {
          path: '../mutators/custom-client.ts',
          name: 'customClient',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'limit',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
      override: {
        transformer: '../transformers/add-version.js',
      },
    },
  },
  mutatorMultiArguments: {
    output: {
      target: '../generated/react-query/mutator-multi-arguments/endpoints.ts',
      schemas: '../generated/react-query/mutator-multi-arguments/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/multi-arguments.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'limit',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
      override: {
        transformer: '../transformers/add-version.js',
      },
    },
  },
  errorType: {
    output: {
      target: '../generated/react-query/error-type/endpoints.ts',
      schemas: '../generated/react-query/error-type/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/error-type.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'limit',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
      override: {
        transformer: '../transformers/add-version.js',
      },
    },
  },
  hookMutator: {
    output: {
      target: '../generated/react-query/hook-mutator/endpoints.ts',
      schemas: '../generated/react-query/hook-mutator/model',
      client: 'react-query',
      override: {
        mutator: {
          path: '../mutators/use-custom-instance.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
    },
  },
  hookMutatorWithSecondParameter: {
    output: {
      target:
        '../generated/react-query/hook-mutator-with-second-parameter/endpoints.ts',
      schemas:
        '../generated/react-query/hook-mutator-with-second-parameter/model',
      client: 'react-query',
      override: {
        mutator: {
          path: '../mutators/use-custom-instance-with-second-parameter.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
    },
  },
  formData: {
    output: {
      target: '../generated/react-query/formData/endpoints.ts',
      schemas: '../generated/react-query/formData/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: '../specifications/form-data.yaml',
    },
  },
  formDataWithHook: {
    output: {
      target: '../generated/react-query/form-data-with-hook/endpoints.ts',
      schemas: '../generated/react-query/form-data-with-hook/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/use-custom-instance.ts',
          name: 'useCustomInstance',
        },
      },
    },
    input: {
      target: '../specifications/form-data.yaml',
    },
  },
  formDataMutator: {
    output: {
      target: '../generated/react-query/form-data/endpoints.ts',
      schemas: '../generated/react-query/form-data/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/custom-instance.ts',
          name: 'customInstance',
        },
        formData: {
          path: '../mutators/custom-form-data.ts',
          name: 'customFormData',
        },
      },
    },
    input: {
      target: '../specifications/form-data.yaml',
    },
  },
  formUrlEncoded: {
    output: {
      target: '../generated/react-query/form-url-encoded/endpoints.ts',
      schemas: '../generated/react-query/form-url-encoded/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/custom-instance.ts',
          name: 'customInstance',
        },
      },
    },
    input: {
      target: '../specifications/form-url-encoded.yaml',
    },
  },
  formUrlEncodedMutator: {
    output: {
      target: '../generated/react-query/formUrlEncoded/endpoints.ts',
      schemas: '../generated/react-query/formUrlEncoded/model',
      client: 'react-query',
      mock: true,
      override: {
        mutator: {
          path: '../mutators/custom-instance.ts',
          name: 'customInstance',
        },
        formUrlEncoded: {
          path: '../mutators/custom-form-url-encoded.ts',
          name: 'customFormUrlEncoded',
        },
      },
    },
    input: {
      target: '../specifications/form-url-encoded.yaml',
    },
  },
  importFromSubdirectory: {
    output: {
      target: '../generated/react-query/importFromSubdirectory/endpoints.ts',
      schemas: '../generated/react-query/importFromSubdirectory/model',
      client: 'react-query',
      mode: 'split',
      mock: true,
    },
    input: '../specifications/import-from-subdirectory/petstore.yaml',
  },
  deprecated: {
    output: {
      target: '../generated/react-query/deprecated/endpoints.ts',
      schemas: '../generated/react-query/deprecated/model',
      client: 'react-query',
      mock: true,
      override: {
        useDeprecatedOperations: false,
      },
    },
    input: '../specifications/deprecated.yaml',
  },
  mockOverride: {
    output: {
      target: '../generated/react-query/mockOverride/endpoints.ts',
      schemas: '../generated/react-query/mockOverride/model',
      client: 'react-query',
      mock: true,
      override: {
        mock: {
          arrayMin: 5,
          arrayMax: 15,
        },
      },
    },
    input: {
      target: '../specifications/petstore.yaml',
    },
  },
  polymorphic: {
    output: {
      target: '../generated/react-query/polymorphic/endpoints.ts',
      schemas: '../generated/react-query/polymorphic/model',
      client: 'react-query',
      mock: true,
      headers: true,
    },
    input: {
      target: '../specifications/polymorphic.yaml',
    },
  },
});
