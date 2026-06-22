export interface UserProfile {
    id: string
    username: string
    email: string
    created_at: string
    avatar_url?: string
    user_games?: UserGames[]
}

export interface UserGames {
    user_id: string
    game_id: string
    status: string
    start_date?: string
    end_date?: string
    created_at: string
    updated_at: string
}