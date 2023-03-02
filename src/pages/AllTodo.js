import { getTodo } from "@/store/todo";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";
import ActiveTodo from "./ActiveTodo";
import ExpiredTodo from "./ExpiredTodo";

const AllTodo = () => {
    const AllTodo = useSelector(getTodo);

    return(
        <div className="flex flex-col gap-4">
            <div className="m-2">
                <ActiveTodo />
            </div>

            <div className="m-2">
                <ExpiredTodo />
            </div>
        </div>
    )
}

export default AllTodo;