const constants = {};

constants.gender = {
  0: "female",
  1: "male",
};

constants.productType = {
  productType: [
    {
      type: 0,
      label: "All products",
    },
    {
      type: 1,
      label: "Custom kits",
    },
    { type: 2, label: "Keycaps" },
    {
      type: 3,
      label: "Accessory",
    },
    {
      type: 4,
      label: "Switch",
    },
  ],
  typeParam: {
    all_product: {
      value: 0,
      label: "All products",
    },
    custom_kits: {
      value: 1,
      label: "Custom kits",
    },
    keycap: {
      value: 2,
      label: "Keycap",
    },
    switch: {
      value: 3,
      label: "Switch",
    },
    accessory: {
      value: 4,
      label: "Accessory",
    },
  },
};

export default constants;
