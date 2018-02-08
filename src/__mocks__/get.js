
export const mockGet = jest.fn((url) => {
    return Promise.resolve({
        beer: 'niceBeer'
      });
});
const mock = jest.fn().mockImplementation(() => {
  return { get: mockGet };
});

export default mock;