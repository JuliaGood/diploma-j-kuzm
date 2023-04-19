import "./sliderBar.style.css";
import * as RadixSlider from '@radix-ui/react-slider';

const SliderBar = ({ onDimRangeChange, roomName, roomDimRange }) => {
  return (
    <RadixSlider.Root
      className="slider-root"
      defaultValue={[roomDimRange]}
      min={0}
      max={100}
      step={1}
      aria-label="Volume"
      onValueChange={(value) => onDimRangeChange(roomName, value)}
    >
      <RadixSlider.Track className="slider-track">
        <RadixSlider.Range className="slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="slider-thumb" />
    </RadixSlider.Root>
  )
}

export default SliderBar;
