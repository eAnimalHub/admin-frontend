import ImageGallery from "react-image-gallery";
const GoalGallerySlider = ({ data }) => {
  return (
    <div className="image-slider">
      <ImageGallery
        items={data}
        autoPlay={true}
        showFullscreenButton={false}
        showPlayButton={false}
        slideInterval={3000}
      />
    </div>
  );
};

export default GoalGallerySlider;
