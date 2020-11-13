/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, createElement } from 'react';
import { List, Avatar, Tooltip } from 'antd';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import { getPetsUrl } from '@/api';

const {
  Item,
  Item: { Meta },
} = List;

const PetsList: FC = () => {
  const [pets, setPets] = useState<any[]>([]);

  const onSuccess = (data: any[]) => {
    setPets(data);
  };

  const { isValidating } = useSWR(getPetsUrl(), { onSuccess });

  const like = (id: number) => {
    setPets(
      pets.map((pet) => (pet.id === id ? { ...pet, like: pet.like ? undefined : true } : pet)),
    );
  };

  const dislike = (id: number) => {
    setPets(
      pets.map((pet) =>
        pet.id === id ? { ...pet, like: pet.like === false ? undefined : false } : pet,
      ),
    );
  };

  const actions = (item: any) => [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={() => like(item.id)}>
        {createElement(item.like === true ? LikeFilled : LikeOutlined)}
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={() => dislike(item.id)}>
        {createElement(item.like === false ? DislikeFilled : DislikeOutlined)}
      </span>
    </Tooltip>,
  ];

  return (
    <>
      {pets.length > 0 || isValidating ? (
        <List
          dataSource={pets}
          itemLayout="vertical"
          loading={isValidating}
          renderItem={(item) => (
            <Item
              key={item.id}
              actions={actions(item)}
              extra={<img width={200} alt="logo" src={item.photo} />}
            >
              <Meta
                avatar={<Avatar src={item.photo} />}
                title={item.name}
                description={item.description}
              />
              {`
                  Birth Year: ${item.birthYear};
                  Specie: ${item.species};
                  ${item.favFoods ? ` Favorite Foods: ${item.favFoods.join(', ')}` : ''}
                `}
            </Item>
          )}
          size="large"
          style={{ maxWidth: 640, paddingTop: 20, margin: 'auto' }}
        />
      ) : (
        'No Pets Found'
      )}
    </>
  );
};

export default PetsList;
