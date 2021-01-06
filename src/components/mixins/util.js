export default {
  methods: {
    snakeToCamel(str) {
      return str.toLowerCase().replace(/(\_[a-z])/g, function(arg) {
        return arg.toUpperCase().replace("_", "");
      });
    }
  }
};
