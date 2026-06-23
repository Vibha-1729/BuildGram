// src/components/PostImage.tsx
interface PostImageProps {
  imageUrl: string;
}

function PostImage({ imageUrl }: PostImageProps) {
  return (
    <img 
      src={imageUrl} 
      alt="Post content" 
      style={{ width: '100%', display: 'block' }} 
    />
  );
}

export default PostImage;