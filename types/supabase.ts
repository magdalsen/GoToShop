export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lists: {
        Row: {
          address: string
          approved: boolean
          archived: boolean
          city: string
          confirmed: boolean | null
          contractorId: string | null
          estimatedCost: number
          id: number
          inprogress: boolean
          listName: string
          ownerId: string
          phone: string
          products: Json[]
          realTip: number | null
          receiveDate: string
          tip: number
        }
        Insert: {
          address?: string
          approved?: boolean
          archived?: boolean
          city?: string
          confirmed?: boolean | null
          contractorId?: string | null
          estimatedCost: number
          id?: number
          inprogress?: boolean
          listName?: string
          ownerId: string
          phone: string
          products: Json[]
          realTip?: number | null
          receiveDate?: string
          tip: number
        }
        Update: {
          address?: string
          approved?: boolean
          archived?: boolean
          city?: string
          confirmed?: boolean | null
          contractorId?: string | null
          estimatedCost?: number
          id?: number
          inprogress?: boolean
          listName?: string
          ownerId?: string
          phone?: string
          products?: Json[]
          realTip?: number | null
          receiveDate?: string
          tip?: number
        }
      }
      users: {
        Row: {
          age: string
          city: string
          email: string
          id: string
          image: string
          name: string
        }
        Insert: {
          age?: string
          city?: string
          email?: string
          id: string
          image?: string
          name?: string
        }
        Update: {
          age?: string
          city?: string
          email?: string
          id?: string
          image?: string
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
