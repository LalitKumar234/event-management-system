import AntTabs from "@/components/packages/AntTabs";
import ProjectDetails from "@/components/packages/ProjectDetails";
import ScrollableTabs from "@/components/packages/Tabs";

export default function Packages(){
    return (
        <div className="bg-[rgb(93,55,106,0.3)]">
            <h2 className="text-center text-[20px] py-5">Nuptials & Co</h2>
            <ProjectDetails/>
            <ScrollableTabs/>
        </div>
    )
}