import * as React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Bs from 'react-bootstrap';
import * as Icons from 'react-bootstrap-icons';
import { useTransition, animated } from '@react-spring/web';

const styles = {
  cardHeight: 126,
  gap: 16 * 1,
};

const Card = ({ name, onClickDown, onClickUp, order, color }) => {
  const [count, setCount] = useState(0);

  const dispatch = ({ type }) => {
    switch (type) {
      case 'decrement':
        setCount(count - 1);
        break;
      case 'increment':
        setCount(count + 1);
        break;
    }
  };

  return (
    <Bs.Card
      style={{ borderLeftColor: `var(--bs-${color})`, borderLeftWidth: 5 }}
      className={'shadow-sm'}
    >
      <Bs.Card.Body>
        <Bs.Row>
          <Bs.Col>
            <Bs.Card.Title>
              <span className={'text-secondary'}>#{order}</span> {name}
            </Bs.Card.Title>
            <Bs.ButtonGroup>
              <Bs.Button
                variant={'secondary'}
                onClick={() => dispatch({ type: 'decrement' })}
              >
                -
              </Bs.Button>
              <Bs.Button variant="outline-secondary" disabled>
                {count}
              </Bs.Button>
              <Bs.Button
                variant={'secondary'}
                onClick={() => dispatch({ type: 'increment' })}
              >
                +
              </Bs.Button>
            </Bs.ButtonGroup>
          </Bs.Col>
          <Bs.Col xs={2}>
            <Bs.ButtonGroup vertical>
              <Bs.Button onClick={onClickUp} variant="light">
                <Icons.ArrowUp />
              </Bs.Button>
              <Bs.Button onClick={onClickDown} variant="light">
                <Icons.ArrowDown />
              </Bs.Button>
            </Bs.ButtonGroup>
          </Bs.Col>
        </Bs.Row>
      </Bs.Card.Body>
    </Bs.Card>
  );
};

const App = () => {
  const [data, setData] = useState([
    { name: 'Andrew', color: 'primary' },
    { name: 'Anna', color: 'success' },
    { name: 'Edward', color: 'info' },
    { name: 'Darya', color: 'danger' },
  ]);

  const onClickUp = (index) => {
    if (index === 0) return;
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index - 1];
    newData[index - 1] = temp;
    setData(newData);
  };

  const onClickDown = (index) => {
    if (index === data.length - 1) return;
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index + 1];
    newData[index + 1] = temp;
    setData(newData);
  };

  let height = 0;

  const transitions = useTransition(
    data.map((person, index) => ({
      ...person,
      height: styles.cardHeight,
      y:
        (height += styles.cardHeight + styles.gap) -
        styles.cardHeight -
        styles.gap,
    })),
    {
      key: (item) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    }
  );

  return (
    <Bs.Container>
      <Bs.Stack gap={5} className={'position-relative'}>
        {transitions((style, person, t, index) => {
          return (
            <animated.div
              style={{
                zIndex: data.length - index,
                position: 'absolute',
                width: '100%',
                ...style,
              }}
            >
              <Card
                name={person.name}
                onClickDown={() => onClickDown(index)}
                onClickUp={() => onClickUp(index)}
                key={index}
                order={index + 1}
                color={person.color}
              />
            </animated.div>
          );
        })}
      </Bs.Stack>
    </Bs.Container>
  );
};

export default App;
