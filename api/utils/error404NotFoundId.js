module.exports = function error404NotFoundId(entity, res) {
        res.status(404).send(`${entity} not found with the given id`);
}