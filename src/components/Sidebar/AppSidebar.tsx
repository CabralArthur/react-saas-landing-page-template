import * as React from "react"
import {
  Building2,
  Home
} from "lucide-react"
import { useEffect, useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import api from "@/app/api"

import MainNav from "@/components/Sidebar/MainNav"
import NavUser from "@/components/Sidebar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { Actions, Subjects } from "@/config/ability"

import TeamHeader from "./TeamHeader"
import { Team } from "@/features/TeamSettingsPage/types"
import { setToken } from "@/utils/storage"

// This is sample data.
const data = {
  mainNav: [
    {
        title: "Home",
        url: "/home",
        icon: Home,
        can: 'READ' as Actions,
        module: 'HOME' as Subjects,
    },
    {
        title: "Team",
        url: "#",
        icon: Building2,
        can: 'READ' as Actions,
        module: 'TEAM' as Subjects,
        items: [
            {
                title: "Settings",
                url: "/team/settings",
                can: 'READ' as Actions,
                module: 'TEAM' as Subjects,
            },
            {
                title: "Users",
                url: "/team/users",
                can: 'READ' as Actions,
                module: 'TEAM' as Subjects,
            }
        ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navigate = useNavigate();
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [nonActiveTeams, setNonActiveTeams] = useState<Team[]>([]);

    // Fetch user teams
    const { data: userTeams = [], isLoading } = useQuery({
        queryKey: ['userTeams'],
        queryFn: async () => {
            const { data } = await api.get<Team[]>('/team/user-teams');
            return data;
        },
    });

    useEffect(() => {
        if (userTeams) {
            setSelectedTeam(userTeams.find(team => team.is_active) || null);
            setNonActiveTeams(userTeams.filter(team => !team.is_active) || []);
        }
    }, [userTeams]);

    // Switch team mutation
    const { mutate: switchTeam } = useMutation({
        mutationFn: async (teamId: string) => {
            const { data } = await api.post(`/team/switch/${teamId}`);
            return data;
        },
        onSuccess: data => {
            setToken(data.token);

            window.location.reload();
        },
    });

    const handleTeamClick = (teamId: string) => {
        const newSelectedTeam = userTeams.find(team => team.id === teamId);
        if (!newSelectedTeam) return;

        setSelectedTeam(newSelectedTeam);
        setNonActiveTeams(userTeams.filter(team => team.id !== teamId));
        switchTeam(teamId);
    };

    const onItemClick = (url: string) => {
        navigate(url);
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamHeader 
                    userTeams={userTeams} 
                    isLoading={isLoading}
                    handleTeamClick={handleTeamClick}
                    selectedTeam={selectedTeam}
                    nonActiveTeams={nonActiveTeams}
                />
            </SidebarHeader>
            <SidebarContent>
                <MainNav items={data.mainNav} onItemClick={onItemClick} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
