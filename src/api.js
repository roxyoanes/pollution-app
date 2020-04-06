
export const pollutionApi = async (location) => {
  try {
    const response = await fetch(
      `https://api.openaq.org/v1/measurements?coordinates=${location.lat},${location.long}&parameter=pm25&radius=15000&limit=1`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
