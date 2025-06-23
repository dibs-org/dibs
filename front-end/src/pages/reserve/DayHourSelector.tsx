import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const START_HOUR = 5.5;
const END_HOUR = 24;
const HOUR_HEIGHT = 35;
const HOUR_LABEL_CELL_WIDTH = 42;

const DRAG_SNAP_IN_MINUTES = 30;

type Props<T> = {
  events: T[];
  renderEvent: (event: T) => React.ReactNode;
  onSelect: (start: string, end: string) => void;
  selectedRange: {
    start: string;
    end: string;
  } | null;
};

// eslint-disable-next-line react-refresh/only-export-components
export const formatHour = (
  hour: number,
  minutes: number,
  includePeriod: boolean = true
) => {
  const date = new Date();
  date.setHours(hour, minutes, 0, 0);
  if (minutes === 0) {
    return format(date, includePeriod ? "ha" : "h").toLowerCase();
  }
  return format(date, includePeriod ? "h:mma" : "h:mm").toLowerCase();
};

export const formatTimeRange = (start: string, end: string) => {
  const startHour = parseInt(start.split(":")[0]);
  const startMinutes = parseInt(start.split(":")[1]);
  const endHour = parseInt(end.split(":")[0]);
  const endMinutes = parseInt(end.split(":")[1]);

  const startPeriod = startHour >= 12 ? "pm" : "am";
  const endPeriod = endHour >= 12 ? "pm" : "am";

  const formattedStart = formatHour(
    startHour,
    startMinutes,
    startPeriod !== endPeriod
  );
  const formattedEnd = formatHour(endHour, endMinutes);

  return `${formattedStart}-${formattedEnd}`;
};

const formatDuration = (start: string, end: string) => {
  const startDate = new Date(`1970-01-01T${start}:00`);
  const endDate = new Date(`1970-01-01T${end}:00`);
  const duration = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(duration / (1000 * 60 * 60));
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
};

const getDurationInMinutes = (start: string, end: string) => {
  const startDate = new Date(`1970-01-01T${start}:00`);
  const endDate = new Date(`1970-01-01T${end}:00`);
  return (endDate.getTime() - startDate.getTime()) / (1000 * 60);
};

const getTimeStringAsMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const padWithZero = (value: number) => {
  return value.toString().padStart(2, "0");
};

const convertYCoordsToMinutes = (
  targetY: number,
  containerElement: HTMLElement
) => {
  const containerRect = containerElement.getBoundingClientRect();
  const yInContainer = targetY - containerRect.top;

  const ratioInRow = yInContainer / HOUR_HEIGHT;
  const snapRatio = DRAG_SNAP_IN_MINUTES / 60;
  const rounded = Math.round(ratioInRow / snapRatio) * snapRatio;

  return rounded * 60;
};

const getDurationStringFromMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${padWithZero(hours)}:${padWithZero(remainingMinutes)}`;
};

const DayHourSelector = <T extends { startTime: string; endTime: string }>({
  events,
  renderEvent = (event) => (
    <p>
      {event.startTime} - {event.endTime}
    </p>
  ),
  onSelect,
  selectedRange,
}: Props<T>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const isSelectingRef = useRef(false);
  const hoverCursorRef = useRef<HTMLDivElement>(null);

  const [selectionState, setSelectionState] = useState<{
    start: string;
    end: string;
  } | null>(selectedRange);

  if (
    !isSelectingRef.current &&
    (selectedRange?.start !== selectionState?.start ||
      selectedRange?.end !== selectionState?.end)
  ) {
    setSelectionState(selectedRange);
  }

  const getYOffsetForTime = useCallback((time: string) => {
    const dateForHours = new Date(`1970-01-01T${time}:00`);
    return (
      (((dateForHours.getHours() - START_HOUR) * 60 +
        dateForHours.getMinutes()) /
        60) *
      HOUR_HEIGHT
    );
  }, []);

  const getHeightForTime = useCallback(
    (startTime: string, endTime: string) => {
      if (!startTime || !endTime) {
        return 0;
      }

      const startMinutes = getYOffsetForTime(startTime);
      const endMinutes = getYOffsetForTime(endTime);
      return endMinutes - startMinutes;
    },
    [getYOffsetForTime]
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const scrollToFirstEvent = () => {
      const firstEvent = scrollContainer.querySelector("[data-event]");
      if (firstEvent) {
        const eventBox = firstEvent.getBoundingClientRect();
        const containerBox = scrollContainer.getBoundingClientRect();
        const offsetTop =
          eventBox.top - containerBox.top + scrollContainer.scrollTop;
        scrollContainer.scrollTo({
          top: offsetTop - 10,
          behavior: "smooth",
        });
      }
    };

    scrollToFirstEvent();
  }, [events]);

  const handleSelect = useCallback(() => {
    if (selectionState) {
      onSelect(selectionState.start, selectionState.end);
    }
  }, [onSelect, selectionState]);

  useEffect(() => {
    const tableContainer = tableContainerRef.current;
    const hoverCursor = hoverCursorRef.current;
    if (!tableContainer || !hoverCursor) {
      return;
    }

    const handleMouseDown = (e: MouseEvent) => {
      const { clientY } = e;

      isSelectingRef.current = true;

      const totalMinutesForY = convertYCoordsToMinutes(clientY, tableContainer);
      const timeForMinutes = getDurationStringFromMinutes(
        totalMinutesForY + START_HOUR * 60
      );

      hoverCursor.style.top = `${getYOffsetForTime(timeForMinutes)}px`;

      setSelectionState({
        start: timeForMinutes,
        end: timeForMinutes,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const totalMinutesForY = convertYCoordsToMinutes(
        e.clientY,
        tableContainer
      );
      const timeForMinutes = getDurationStringFromMinutes(
        totalMinutesForY + START_HOUR * 60
      );

      if (isSelectingRef.current) {
        setSelectionState((prev) => {
          if (prev?.start && prev.end && !isSelectingRef.current) {
            return prev;
          }

          const isBefore =
            getTimeStringAsMinutes(timeForMinutes) <
            getTimeStringAsMinutes(prev?.start ?? "");

          if (prev?.start && isBefore) {
            return {
              start: timeForMinutes,
              end: prev.start,
            };
          } else if (prev?.start && !isBefore) {
            return {
              start: prev.start,
              end: timeForMinutes,
            };
          }

          return {
            start: timeForMinutes,
            end: timeForMinutes,
          };
        });
      }

      hoverCursor.style.top = `${getYOffsetForTime(timeForMinutes)}px`;
    };

    const handleMouseUp = () => {
      isSelectingRef.current = false;
      handleSelect();
      // Callback can go here
      return;
    };

    tableContainer.addEventListener("mousemove", handleMouseMove);
    tableContainer.addEventListener("mousedown", handleMouseDown);
    tableContainer.addEventListener("mouseup", handleMouseUp);
    return () => {
      tableContainer.removeEventListener("mousemove", handleMouseMove);
      tableContainer.removeEventListener("mousedown", handleMouseDown);
      tableContainer.removeEventListener("mouseup", handleMouseUp);
    };
  }, [tableContainerRef, getYOffsetForTime, handleSelect]);

  const placedEvents = useMemo(() => {
    return events.map((event) => {
      const styles = {
        width: `calc(100% - ${HOUR_LABEL_CELL_WIDTH}px)`,
        top: `${getYOffsetForTime(event.startTime) + 1}px`,
        left: `${HOUR_LABEL_CELL_WIDTH}px`,
        height: `${getHeightForTime(event.startTime, event.endTime) - 2}px`,
      };

      return (
        <div
          key={event.startTime}
          className="absolute"
          data-event
          style={styles}
        >
          {renderEvent(event)}
        </div>
      );
    });
  }, [events, getHeightForTime, getYOffsetForTime, renderEvent]);

  let selectionCursorPadding;
  const selectionDuration = selectionState
    ? getDurationInMinutes(selectionState.start, selectionState.end)
    : 0;
  if (selectionDuration < 30) {
    selectionCursorPadding = "py-1 px-2";
  } else if (selectionDuration < 60) {
    selectionCursorPadding = "py-1 px-2";
  } else {
    selectionCursorPadding = "py-1 px-2";
  }

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-y-auto h-[400px] border border-gray-200 dark:border-gray-800 rounded-xl bg-bg-default px-2"
    >
      <div className="relative w-full select-none" ref={tableContainerRef}>
        <table className="w-full table-fixed">
          <tbody>
            {Array.from({ length: END_HOUR - START_HOUR }, (_, index) => {
              const isFirstRow = index === 0;
              const isLastRow = index === END_HOUR - START_HOUR - 1;
              const hour = START_HOUR + index;
              const date = new Date();
              date.setHours(hour, 0, 0, 0);
              const formattedHour = formatHour(hour, 0);

              const rowHeight =
                isFirstRow || isLastRow ? HOUR_HEIGHT / 2 : HOUR_HEIGHT;

              return (
                <tr
                  key={index}
                  className="border-t border-gray-300/30 dark:border-gray-800/30 first:border-t-0"
                  style={{
                    height: `${rowHeight}px`,
                  }}
                >
                  <td
                    className="text-xs text-gray-500 bg-bg-default text-right pr-2"
                    style={{
                      width: `${HOUR_LABEL_CELL_WIDTH}px`,
                      transform: `translateY(${-rowHeight / 2}px)`,
                    }}
                  >
                    {isFirstRow ? "" : formattedHour}
                  </td>
                  <td className="p-2"></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {placedEvents}
        {/* Selection cursor */}
        <div
          ref={hoverCursorRef}
          className="absolute w-1 h-px rounded-lg text-xs flex items-center justify-center gap-1 text-gray-500"
          style={{
            left: `${HOUR_LABEL_CELL_WIDTH}px`,
            width: `calc(100% - ${HOUR_LABEL_CELL_WIDTH}px)`,
          }}
        >
          <div className="h-px w-full bg-gray-500/50" />
          <div className="text-xs">+</div>
          <div className="h-px w-full bg-gray-500/50" />
        </div>
        {/* Selection cursor */}
        <div
          className={twMerge(
            "absolute w-1 bg-gray-500/10 border border-gray-500/10 rounded-lg text-xs p-2",
            selectionCursorPadding
          )}
          style={{
            left: `${HOUR_LABEL_CELL_WIDTH}px`,
            opacity: selectionState ? 1 : 0,
            width: `calc(100% - ${HOUR_LABEL_CELL_WIDTH}px)`,
            top: `${getYOffsetForTime(selectionState?.start ?? "") + 1}px`,
            height:
              selectionState?.start && selectionState?.end
                ? `${Math.max(
                    getHeightForTime(selectionState.start, selectionState.end) -
                      2,
                    1
                  )}px`
                : "1px",
          }}
        >
          {selectionState && selectionDuration > 30 ? (
            <div className="flex flex-col">
              <div>
                {formatTimeRange(selectionState.start, selectionState.end)}
              </div>
              {getDurationInMinutes(selectionState.start, selectionState.end) >
                60 && (
                <div className="opacity-50">
                  {formatDuration(selectionState.start, selectionState.end)}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DayHourSelector;
