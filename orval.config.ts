module.exports = {
  lookstore: {
    input: {},
    output: {
      mode: 'split',
      target: './src/services/generated/lookstore.ts',
      override: {
        // custom  instance
        mutator: {
          path: './src/services/mutator/look-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
  managerstore: {
    input: {
      filters: {},
    },
    output: {
      mode: 'split',
      target: './src/services/generated/managerstore.ts',
      override: {
        // custom  instance
        mutator: {
          path: './src/services/mutator/manager-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
}
