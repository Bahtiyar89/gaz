import "maplibre-gl/dist/maplibre-gl.css";
import Map, {
  CircleLayer,
  FullscreenControl,
  Layer,
  LineLayer,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { FeatureCollection } from "geojson";
import { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import investLogo from "~/assets/invest-logo.png";
import * as React from "react";

function StatusGrid() {
  return (
    <Grid container spacing={0} sx={{ maxWidth: "18rem" }}>
      {[
        { title: "Задолжность", percentage: 89, color: "success" },
        { title: "Аванс", percentage: 87, color: "success" },
        { title: "План", percentage: 52, color: "warning" },
        { title: "Лимит", percentage: 40, color: "warning" },
        { title: "Освоение вложений", percentage: 12, color: "error" },
        { title: "Оплата КЗ", percentage: 78, color: "success" },
      ].map((item, i) => (
        <Grid
          item
          xs={4}
          sx={{
            maxWidth: "6rem",
            width: "6rem",
            height: "6rem",
            position: "relative",
          }}
        >
          <Stack
            spacing={"1rem"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              key={i}
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/*@ts-ignore*/}
              <CircularProgress
                //  color={item.color}
                variant="determinate"
                value={item.percentage}
              />

              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                >
                  {`${item.percentage}%`}
                </Typography>
              </Box>
            </Box>

            <Typography
              textAlign={"center"}
              variant="subtitle1"
              lineHeight={1.25}
            >
              {item.title}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}

function InputGrid() {
  return (
    <Grid container spacing={1} sx={{ maxWidth: "20rem" }}>
      {["Подрядные работы", "Прочее", "Материалы", "Всего", "Оборудование"].map(
        (item, i) => (
          <Grid
            item
            xs={6}
            sx={
              {
                // maxWidth: '6rem',
                // width: '6rem',
                // height: '6rem',
                // position: 'relative',
              }
            }
          >
            <TextField
              key={i}
              defaultValue={42}
              label={item}
              variant="standard"
            />
          </Grid>
        )
      )}
    </Grid>
  );
}

export const layerStyleLines: LineLayer = {
  id: "lines",
  type: "line",
  paint: {
    "line-color": "#FF7700",
    "line-width": 2,
    "line-opacity": 1,
  },
};

export const layerStylePoints: CircleLayer = {
  id: "points",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#FF7700",
    "circle-opacity": 1,
  },
};

const lineSource: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [68.25633600178855, 68.06877442422774],
          [59.31163198257039, 65.3579015651367],
          [59.78148604771016, 60.82223760562917],
          [54.39874952445763, 57.92044947725043],
        ],
        type: "LineString",
      },
    },
  ],
};

const pointSource: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [68.2561222361251, 68.06889783939317],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [59.313866298797166, 65.3568440203837],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [59.78141141664446, 60.82236808385889],
        type: "Point",
      },
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [54.39885137494272, 57.920882875221196],
        type: "Point",
      },
    },
  ],
};

export default function MapContainer() {
  const [popupInfo, setPopupInfo] = useState<null | {
    lat: number;
    lng: number;
  }>(null);
  const theme = useTheme();

  return (
    <>
      <Stack
        visibility={popupInfo ? "visible" : "hidden"}
        position={"absolute"}
        top={"5rem"}
        left={"1rem"}
        zIndex={"999"}
      >
        <Paper>
          <Stack spacing={"1rem"} p={"1rem"}>
            <Typography variant={"h6"}>I квартал</Typography>

            <StatusGrid />
          </Stack>
        </Paper>
      </Stack>

      <Stack
        visibility={popupInfo ? "visible" : "hidden"}
        sx={{ opacity: "0.7" }}
        position={"absolute"}
        bottom={"1rem"}
        right={"1rem"}
        zIndex={"999"}
      >
        <Paper>
          <Stack spacing={"1rem"} p={"1rem"}>
            <img src={investLogo} alt={"invest-logo"} />
          </Stack>
        </Paper>
      </Stack>

      <Stack
        visibility={popupInfo ? "visible" : "hidden"}
        position={"absolute"}
        top={"5rem"}
        right={"1rem"}
        zIndex={"999"}
        spacing={"1rem"}
      >
        <Paper>
          <Stack spacing={"1rem"} p={"1rem"}>
            <InputGrid />
          </Stack>
        </Paper>

        <Paper>
          <Stack spacing={"1rem"} p={"1rem"}>
            <Stack>
              <Typography variant={"h6"}>План-факт</Typography>

              <Typography
                color={theme.palette.secondary.dark}
                variant={"subtitle1"}
              >
                на 01.01.2023
              </Typography>
            </Stack>

            <Stack>
              <Typography variant={"subtitle1"}>
                Управленческий учет:
              </Typography>
            </Stack>

            <Stack>
              <Typography variant={"subtitle1"}>Факт:</Typography>
            </Stack>

            <Stack>
              <Typography variant={"subtitle1"}>
                Сравнительный анализ:
              </Typography>
            </Stack>
          </Stack>
          <ButtonGroup
            fullWidth={true}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>СМР</Button>
            <Button>Оборуд-е</Button>
            <Button>Прочие</Button>
          </ButtonGroup>
        </Paper>
      </Stack>

      <Map
        onClick={(e) => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        }}
        //  mapLib={maplibregl}
        interactiveLayerIds={["lines", "points"]}
        initialViewState={{
          longitude: 60.1456,
          latitude: 62.4507,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={{
          version: 8,
          sources: {
            "raster-tiles": {
              type: "raster",
              tiles: [
                "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "simple-tiles",
              type: "raster",
              source: "raster-tiles",
              minzoom: 0,
              maxzoom: 23,
            },
          ],
        }}
      >
        <Source type="geojson" data={lineSource}>
          <Layer {...layerStyleLines} />
        </Source>
        <Source type="geojson" data={pointSource}>
          <Layer {...layerStylePoints} />
        </Source>
        <ScaleControl />
        <NavigationControl position={"bottom-left"} />
        <FullscreenControl position={"bottom-left"} />
        {popupInfo && (
          <Popup
            closeButton={false}
            anchor="top"
            longitude={Number(popupInfo.lng)}
            latitude={Number(popupInfo.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div className={`leading-tight flex flex-col space-y-1`}>
              <p className={`text-lg leading-none`}>
                ««Газоснабжение Сыктывкарского промузла»»
              </p>
              <div>
                <p>Руководитель проекта</p>
                <p>Т.Н. Рахматуллин</p>
              </div>
              <div>
                <p>Ожидаемая Стоимость ОФ</p>
                <p>8349,604 (млн.руб)</p>
              </div>
              <div className={`flex space-x-3`}>
                <div>
                  <p>Дата начала:</p>
                  <p>12/27/2019</p>
                </div>
                <div>
                  <p>Дата окончания:</p>
                  <p>12/20/2025</p>
                </div>
              </div>
              <div>
                <p>Разрешение на строительство</p>
                <p>08/15/2023</p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
}
