const mockApi = [
  {
    productName: "product name",
    productImages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    favorite: true,
    price: 10000,
    ownerImage: 1,
    ownerName: "owner name",
  },
];

for (let i = 0; i < 9; i++) {
  mockApi.push(mockApi[0]);
}

export default mockApi;
