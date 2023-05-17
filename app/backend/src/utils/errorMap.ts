const errorMap: Record<string, number> = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
};

const mapError = (type: string): number => errorMap[type] || 500;

export {
  errorMap,
  mapError,
};
