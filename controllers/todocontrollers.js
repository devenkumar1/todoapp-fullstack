let todos = [];

module.exports.getGetTodos=(req, res) => {
    res.json(todos);
}

module.exports.postAddTodo= (req, res) => {
    const { name } = req.body;
    const newTodo = {
        id: uuidv4(),
        name
    };
    todos.push(newTodo);
    res.json(todos);
}

module.exports.postDeleteTodo