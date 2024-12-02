export interface EditorNotification {
    id?: string;
    message: string;
    type: 'success' | 'error' | 'info';
}