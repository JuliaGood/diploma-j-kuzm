import "./customSlider.style.css";
import * as Slider from '@radix-ui/react-slider';

const CustomSlider = ({ onSliderChange, brightRange }) => {
  return (
    <Slider.Root
      className="slider-root"
      defaultValue={[brightRange]}
      min={0}
      max={100}
      value={[brightRange]}
      step={1}
      onValueChange={(value) => onSliderChange(value)}
    >
      <Slider.Track className="slider-track">
        <Slider.Range className="slider-range" />
      </Slider.Track>
      <Slider.Thumb className="slider-thumb" />
    </Slider.Root>
  )
}

export default CustomSlider;
