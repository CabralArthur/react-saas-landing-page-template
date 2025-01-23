import { SidebarMenuButton, SidebarTrigger } from "../ui/sidebar";
import logo from "@/assets/img/utmizer-logo.svg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Team } from "@/features/TeamSettingsPage/types";
import { Skeleton } from "../ui/skeleton";

interface TeamHeaderProps {
    userTeams: Team[];
    isLoading: boolean;
    handleTeamClick: (teamId: string) => void;
    selectedTeam: Team | null;
    nonActiveTeams: Team[];
}

export default function TeamHeader({ 
    isLoading, 
    handleTeamClick,
    selectedTeam,
    nonActiveTeams
}: TeamHeaderProps) {
    return (
        <div className="flex items-center gap-3">
            <SidebarTrigger className="ml-1">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <img src={logo} alt="logo" className="w-full h-full" />
                </div>
            </SidebarTrigger>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton disabled={isLoading}>
                        {isLoading ? (
                            <Skeleton className="h-4 w-40" />
                        ) : (
                            selectedTeam?.name || "Select Team"
                        )}
                        <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    {nonActiveTeams.map(team => (
                        <DropdownMenuItem 
                            key={team.id} 
                            onClick={() => handleTeamClick(team.id)}
                        >
                            <span>{team.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
