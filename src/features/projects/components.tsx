import {Button, Dialog, DialogTitle, ListItem} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useSWR from "swr";
import {getData} from "~/common/utils";
import {IProjects} from "~/features/projects/types";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Add, Delete} from "@mui/icons-material";
import {Dispatch, MouseEventHandler, SetStateAction} from "react";

export interface ProjectsDialogProps {
  open: boolean;
  setOpen:  Dispatch<SetStateAction<boolean>>
}

function Project(props: { title: string; date: string | Date; onClick: MouseEventHandler<HTMLDivElement>}) {
  return <ListItem
    disableGutters
    sx={{py: 0,}}
    secondaryAction={
      <IconButton sx={{mr: '0.5rem'}} edge="end" aria-label="delete">
        <Delete/>
      </IconButton>
    }
  >
    <ListItemButton onClick={props.onClick}>
      <ListItemText primary={props.title} secondary={props.date.toString()}/>
    </ListItemButton>
  </ListItem>
}

export default function ProjectsDialog(props: ProjectsDialogProps) {
  const endpoint = `projects`;
  const {data} = useSWR<IProjects>(endpoint, getData)

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle sx={{pl: '1rem'}}>Проекты</DialogTitle>

      {data && <List sx={{pt: 0}} >
        {data?.entries.map((project) => (
          <Project onClick={() => props.setOpen(false)} title={project.title} date={project.lastEdit} key={project.id}/>
        ))}
      </List>}

      <Box p={'1rem'}>
        <Button variant="contained" startIcon={<Add />}>Создать проект</Button>
      </Box>
    </Dialog>
  );
}