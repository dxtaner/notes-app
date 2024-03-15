import { Waveform } from "@uiball/loaders";

// eslint-disable-next-line react/prop-types
function Spinner({ size }) {
  return <Waveform size={size} lineWeight={3.5} speed={0.8} color="black" />;
}
export default Spinner;
