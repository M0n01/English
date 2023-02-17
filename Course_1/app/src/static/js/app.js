function App() {
    const { Container, Row, Col } = ReactBootstrap;
    return (
        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <TodoListCard />
                </Col>
            </Row>
        </Container>
    );
}

function TodoListCard() {
    const [items, setItems] = React.useState(null);

    React.useEffect(() => {
        fetch('/items')
            .then(r => r.json())
            .then(setItems);
    }, []);

    const onNewItem = React.useCallback(
        newItem => {
            setItems([...items, newItem]);
        },
        [items],
    );

    const onItemUpdate = React.useCallback(
        item => {
            const index = items.findIndex(i => i.id === item.id);
            setItems([
                ...items.slice(0, index),
                item,
                ...items.slice(index + 1),
            ]);
        },
        [items],
    );

    const onItemRemoval = React.useCallback(
        item => {
            const index = items.findIndex(i => i.id === item.id);
            setItems([...items.slice(0, index), ...items.slice(index + 1)]);
        },
        [items],
    );

    if (items === null) return 'Loading...';

    return (
        <React.Fragment>
            <AddItemForm onNewItem={onNewItem} />
            {items.length === 0 && (
                <p className="text-center">No items yet! Add one above!	</p>
            )}
            {items.map(item => (
                <ItemDisplay
                    item={item}
                    key={item.id}
                    onItemUpdate={onItemUpdate}
                    onItemRemoval={onItemRemoval}
                />
            ))}
	   <img src="data:image/jpeg;base64,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" />
        </React.Fragment>
    );
}

function AddItemForm({ onNewItem }) {
    const { Form, InputGroup, Button } = ReactBootstrap;

    const [newItem, setNewItem] = React.useState('');
    const [submitting, setSubmitting] = React.useState(false);

    const submitNewItem = e => {
        e.preventDefault();
        setSubmitting(true);
        fetch('/items', {
            method: 'POST',
            body: JSON.stringify({ name: newItem }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json())
            .then(item => {
                onNewItem(item);
                setSubmitting(false);
                setNewItem('');
            });
    };

    return (
        <Form onSubmit={submitNewItem}>
            <InputGroup className="mb-3">
                <Form.Control
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    placeholder="New Item"
                    aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                    <Button
                        type="submit"
                        variant="success"
                        disabled={!newItem.length}
                        className={submitting ? 'disabled' : ''}
                    >
                        {submitting ? 'Adding...' : 'Add Item'}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    );
}

function ItemDisplay({ item, onItemUpdate, onItemRemoval }) {
    const { Container, Row, Col, Button } = ReactBootstrap;

    const toggleCompletion = () => {
        fetch(`/items/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: item.name,
                completed: !item.completed,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(r => r.json())
            .then(onItemUpdate);
    };

    const removeItem = () => {
        fetch(`/items/${item.id}`, { method: 'DELETE' }).then(() =>
            onItemRemoval(item),
        );
    };

    return (
        <Container fluid className={`item ${item.completed && 'completed'}`}>
            <Row>
                <Col xs={1} className="text-center">
                    <Button
                        className="toggles"
                        size="sm"
                        variant="link"
                        onClick={toggleCompletion}
                        aria-label={
                            item.completed
                                ? 'Mark item as incomplete'
                                : 'Mark item as complete'
                        }
                    >
                        <i
                            className={`far ${
                                item.completed ? 'fa-check-square' : 'fa-square'
                            }`}
                        />
                    </Button>
                </Col>
                <Col xs={10} className="name">
                    {item.name}
                </Col>
                <Col xs={1} className="text-center remove">
                    <Button
                        size="sm"
                        variant="link"
                        onClick={removeItem}
                        aria-label="Remove Item"
                    >
                        <i className="fa fa-trash text-danger" />
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
