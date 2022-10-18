import { DefaultUi, Player, Video } from "@vime/react";

interface Props {
  id: string | number;
  source: string;
  type: string;
  paused: boolean;
  setPaused: any;
}

export default function VideoPlayer({
  id,
  source,
  type,
  paused,
  setPaused,
}: Props) {
  return (
    <Player
      onVmPlay={() => {
        setPaused(false);
      }}
      playsinline
      paused={paused}
      key={id}
    >
      <Video>
        <source data-src={source} type={type} />
      </Video>
      <DefaultUi></DefaultUi>
    </Player>
  );
}
