import photo from '~/assets/photo.png';

const PostPhoto = () => {
  return (
    <div>
      <img src={photo.src} alt='Thumbnail' />
    </div>
  );
};

export default PostPhoto;
