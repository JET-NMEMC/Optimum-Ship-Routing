function Astar(startLatLng, endLatLng, grid) {
    const start = latLngToGrid(startLatLng);
    const end = latLngToGrid(endLatLng);
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    gScore.set(start.toString(), 0);
    fScore.set(start.toString(), heuristic(start, end));

    openSet.push(start);

    while (openSet.length > 0) {
        const current = getLowestFScore(openSet, fScore);
        if (current.toString() === end.toString()) {
            return reconstructPath(cameFrom, current).map(gridToLatLng);
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.add(current.toString());

        const neighbors = getNeighbors(current, grid);
        for (const neighbor of neighbors) {
            if (closedSet.has(neighbor.toString())) {
                continue;
            }

            const tentativeGScore = gScore.get(current.toString()) + 1;

            if (!openSet.includes(neighbor)) {
                openSet.push(neighbor);
            } else if (tentativeGScore >= gScore.get(neighbor.toString())) {
                continue;
            }

            cameFrom.set(neighbor.toString(), current);
            gScore.set(neighbor.toString(), tentativeGScore);
            fScore.set(neighbor.toString(), tentativeGScore + heuristic(neighbor, end));
        }
    }

    return null;
}

function getLowestFScore(set, fScore) {
    let min = Infinity;
    let minNode = null;
    for (const node of set) {
        const score = fScore.get(node.toString());
        if (score < min) {
            min = score;
            minNode = node;
        }
    }
    return minNode;
}

function getNeighbors(node, grid) {
    const neighbors = [];

    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    for (const [dx, dy] of directions) {
        const x = node[0] + dx;
        const y = node[1] + dy;

        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
            continue;
        }

        if (grid[x][y] === 0) {
            continue;
        }

        neighbors.push([x, y]);
    }

    return neighbors;
}

function heuristic(a, b) {
    // Euclidean distance
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current.toString())) {
        current = cameFrom.get(current.toString());
        path.unshift(current);
    }
    return path;
}

function latLngToGrid(latLng) {
    const lat = latLng[0];
    const lng = latLng[1];
    const row = Math.floor((90 - lat) / 1);
    const col = Math.floor((180 + lng) / 1);
    return [row, col];
}

function gridToLatLng(grid) {
    const row = grid[0];
    const col = grid[1];
    const lat = 90 - row;
    const lng = col - 180;
    return [lat, lng];
}
