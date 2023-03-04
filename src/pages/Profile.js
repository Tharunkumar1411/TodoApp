import { getActiveCount} from "@/store/active";
import { getExpireCount } from "@/store/expire";
import { getUserDetails } from "@/store/user";
import { Telegram } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

const { Divider, Card, CardContent, Button } = require("@mui/material")

const ProfilePage = () => {
    const username = useSelector(getUserDetails);
    const activeCount = useSelector(getActiveCount);
    const expireCount = useSelector(getExpireCount);

    function notify(){
        toast.success("This Feature is coming soon...")
    }

    

    return(
        <div className="flex flex-col pt-4 md:flex-row justify-evenly gap-2 gap-2 w-full">
            <div className="flex justify-center">
                <Card className={styles.backclr}>

                    <CardContent>
                        <h1  className="text-2xl font-bold pb-2">{username.name}</h1>
                        <label>Entry:{username.entry}</label><br />

                        <div className="flex flex-row pt-4">
                            <Telegram className="pr-2"/>
                            <label>{username.teleId || `(Id Not Given)`}</label>
                        </div>
                        {/* <Button>Activate</Button> */}

                        <div className="flex flex-col gap-4 mt-4">
                            <div className="border border-grey-500 p-2 rounded-md w-36">Active  : <strong>{activeCount}</strong></div>
                            <div className="border border-grey-500 p-2 rounded-md w-36">Achieved  : <strong>{expireCount}</strong></div>
                        </div>

                    </CardContent>
                </Card>
            </div>

            <div className="md:mt-8 mt-2">
                <div>
                    <h1 className="text-2xl font-bold pb-2 text-center">Add Telegram Bot</h1>
                    <p>(This will help you to effective with your todo's)</p>
                    <ul className="mt-4">
                        <li>You will notify through telegram.</li>
                        <li>You can update todo status through telegram.</li>
                        <li>No need to visit website all the time.</li>
                    </ul><br />
                    <Button className="" variant="outlined" size="small" onClick={() => notify()}>Add Bot</Button><br />
                </div>
                <br /><Divider />

            </div>
        </div>
    )
}

export default ProfilePage;