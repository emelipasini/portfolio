export interface DiscordEmbed {
    title: string;
    description: string;
    color: number;
}

export interface DiscordPayload {
    content: string;
    embeds: DiscordEmbed[];
}
