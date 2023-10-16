import {
  Button, Card,
  CardActions, CardContent, CardMedia,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import director1Photo from '~/assets/director1.png';
import director2Photo from '~/assets/director2.png'

function DirectorCard(props: { branch: string; name: string; role: string; image: string; link: string }) {
  return <Stack spacing={'1rem'}>
    <Typography variant={"h5"}>{props.branch}</Typography>

    <Card sx={{ minWidth: 320 }}>
      <CardMedia
        sx={{ height: 320 }}
        image={props.image}
        title={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.role}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={'a'} href={props.link}>Подробнее</Button>
      </CardActions>
    </Card>
  </Stack>
}

function CustomLink(props: { disableDivider?: boolean; title: string; secondary?: string; }) {
  return <ListItem
    disablePadding
    divider={!props.disableDivider}
    component={'a'}
    href={'https://invest.gazprom.ru/'}
  >
    <ListItemButton>
      <ListItemText primary={props.title} secondary={props.secondary}/>
      <ListItemIcon sx={{
        minWidth: '1rem',
        ml: '1rem'
      }}>
        <ChevronRight/>
      </ListItemIcon>
    </ListItemButton>
  </ListItem>
}

function Links() {
  return <Stack spacing={'1rem'}>
    <Typography variant={"h5"}>Ссылки</Typography>

    <Paper>
      <List>
        <CustomLink title={"Персонал"} secondary={'473 сотрудника'}/>
        <CustomLink title={"ИПО"}/>
        <CustomLink title={"ОКС в Реализации"}/>
        <CustomLink title={"Инвестиционные проекты"}/>
        <CustomLink title={"Стратегические проекты"} disableDivider/>
      </List>
    </Paper>
  </Stack>
}

export function BranchRoute() {
  return <Stack p={'3rem'} spacing={'2rem'}>
    <Typography variant={"h4"}>Филиал</Typography>

    <Stack direction={"row"} spacing={'4rem'} >
      <Stack direction={'row'} spacing={'2rem'}>
        <DirectorCard
          branch={'Газпром Инвест'}
          name={'Тюрин Вячеслав Александрович'}
          role={'Генеральный директор'}
          image={director1Photo}
          link={'https://invest.gazprom.ru/'}
        />

        <DirectorCard
          branch={'Филиал Северо-Запад'}
          name={'Рахматулин Тагир Наильевич'}
          role={'Руководитель филиала'}
          image={director2Photo}
          link={'https://invest.gazprom.ru/'}
        />
      </Stack>

      <Links/>
    </Stack>
  </Stack>
}