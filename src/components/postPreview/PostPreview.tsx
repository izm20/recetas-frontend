import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import NoLike from './assets/favorite_border-24px.svg';
import Like from './assets/favorite-24px.svg';
import Comment from './assets/comment-24px.svg';
import NoSave from './assets/bookmark_border-24px.svg';
import Save from './assets/bookmark-24px.svg';
import { Statistic } from '../../subcomponents/Statistic';
import { Icon } from '../../subcomponents/Icon/Icon';
import { API, getPostData, updateLike, updateSave } from '../../api';

const Container = styled.div`
  width: 200px;
  height: 333px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  margin: 1%;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 200px;
  height: 50%;
  object-fit: fill;
  border-radius: 25px 25px 0px 0px;
  align-self: flex-start;
`;

const TitleBox = styled.div`
  height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.div`
  width: 150px;
  text-align: center;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const Icons = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const IconGroup = styled.div`
  width: fit-content;
  margin: auto;
  color: #bdbdbd;
`;

export interface PostPreviewProps {
  idPost: string;
}

const buttonSize = '25px';
const textSize = '12px';
const spaceBetween = '5px';

export const PostPreview: FC<PostPreviewProps> = (props) => {
  const [saved, setSaved] = useState(false);
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState('');
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<number>(0);

  const setData = async (post: any) => {
    post.then((data: any) => {
      setImage(
        `${API}static/users/${data.owner._id}/posts/${data._id}/${data._id}.jpg`
      );
      setTitle(data.title);
      setLikes(data.likes);
      setComments(data.comments);
    });
  };

  useEffect(() => {
    setData(getPostData('post/' + props.idPost));
    return () => {};
  }, [props]);

  const handleClickLikes = (isLiked: boolean) => {
    const endpoint = `post/${props.idPost}/like`;
    if (isLiked) {
      setLikes(likes + 1);
      updateLike(endpoint, 'POST');
    } else {
      setLikes(likes - 1);
      updateLike(endpoint, 'DELETE');
    }
  };

  const handleClickSave = (isSaved: boolean) => {
    const endpoint = `post/${props.idPost}/save`;
    if (isSaved) {
      setSaved(!saved);
      updateSave(endpoint, 'POST');
    } else {
      setSaved(!saved);
      updateSave(endpoint, 'DELETE');
    }
  };

  return (
    <Container>
      <Image src={image} alt="Recipe Photo" aria-label="Recipe Photo"/>
      <TitleBox>
        <TitleText>{title}</TitleText>
      </TitleBox>
      <Icons>
        <IconGroup>
          <Statistic
            size={textSize}
            spaceBetween={spaceBetween}
            icon
            number={likes}
          >
            <Icon
              src={NoLike}
              active_src={Like}
              handleClicks={handleClickLikes}
              size={buttonSize}
            />
          </Statistic>
        </IconGroup>
        <IconGroup>
          <Statistic
            size={textSize}
            spaceBetween={spaceBetween}
            icon
            number={comments}
          >
            <Icon
              src={Comment}
              size={buttonSize}
            />
          </Statistic>
        </IconGroup>
        <IconGroup>
          <Icon
            src={NoSave}
            active_src={Save}
            handleClicks={handleClickSave}
            size={buttonSize}
          />
        </IconGroup>
      </Icons>
    </Container>
  );
};
