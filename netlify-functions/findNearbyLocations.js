
function haversineDistance(lat1, lon1, lat2, lon2)  {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

 const findNearbyLocations = (latitude, longitude, destinations, limit = 5) => {
    const distances = destinations.map((destination) => ({
        ...destination,
        distance: haversineDistance(latitude, longitude, destination.latitude, destination.longitude)
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const nearbyLocations = distances.slice(0, limit);
    const lastDistance = nearbyLocations[nearbyLocations.length - 1].distance;

    let index = limit;
    while (index < distances.length && distances[index].distance <= lastDistance) {
        nearbyLocations.push(distances[index]);
        index++;
    }
    return nearbyLocations;
};
module.exports = findNearbyLocations
