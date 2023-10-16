import {useEffect, useRef} from "react";
import { Timeline, TimelineOptions } from "vis-timeline/standalone/esm/vis-timeline-graph2d";
import "vis-timeline/dist/vis-timeline-graph2d.css";



const options: TimelineOptions = {
  stack: true,
  maxHeight: 640,
  horizontalScroll: false,
  verticalScroll: true,
  zoomKey: "ctrlKey",
  start: Date.now() - 1000 * 60 * 60 * 24 * 3, // minus 3 days
  end: Date.now() + 1000 * 60 * 60 * 24 * 21, // plus 1 months aprox.
  orientation: {
    axis: "both",
    item: "top",
  },
};

function useTimelineData() {
  const now = Date.now();
  const count = 300;

  const groups = [];
  const items = [];

  for (let i = 0; i < count; i++) {
    const start = now + 1000 * 60 * 60 * 24 * (i + Math.floor(Math.random() * 7));
    const end = start + 1000 * 60 * 60 * 24 * (1 + Math.floor(Math.random() * 5));

    groups.push({
      id: i,
      content: "Ответственный " + i,
      order: i,
    });

    items.push({
      id: i,
      group: i,
      start: start,
      end: end,
      type: "range",
      content: "Задача " + i,
    });
  }
  return {groups, items};
}

const {groups, items} = useTimelineData();


export function TimelineRoute() {
  const ref = useRef<HTMLDivElement | null>(null);
  // useTimelineData(ref);

  useEffect(() => {
      if (ref.current) {
        // @ts-ignore
        const timeline = new Timeline(ref.current, null, options);
        timeline.setGroups(groups);
        timeline.setItems(items);
      }
      // return;
  }, []);
  return (
      <div ref={ref} className={`h-full w-full shadow-3`} />
  );
}