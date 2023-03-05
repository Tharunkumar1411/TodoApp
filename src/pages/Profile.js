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
        <div className="flex flex-col pt-4 md:pt-12 md:flex-row justify-evenly gap-2 gap-2 w-full">
            <div className="flex justify-center h-fit">
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

            <div className="flex justify-center pt-4 ">
                <div className="w-4/5">
                    <h1 className="text-2xl font-bold pb-2 text-center">Add Telegram Bot</h1>
                    <ul className="mt-4 flex md:flex-row flex-col ">
                        <li className="p-2">1. You will receive notifications on Telegram, which will keep you informed about any updates to your to-do list.</li>
                        <li className="p-2">2. Using the Telegram app, you can also update the status of your to-do list, such as marking tasks as completed or adding new items.</li>
                        <li className="p-2">3. This feature eliminates the need to constantly visit the website to check for updates or make changes, making the process more convenient and efficient for you.</li>
                    </ul><br />
                    <Button className="" variant="outlined" size="small" onClick={() => notify()}>Add Bot</Button><br /><br />
                </div>

            </div>
        </div>
    )
}

export default ProfilePage;