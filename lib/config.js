module.export = {
    config: {
        Messages: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        delay: {
            title: 'Normal Delay (in minutes)',
            type: 'integer',
            default: 10,
            minimum: 1
        },
        deviation: {
            title: 'Random offset (± in minutes)',
            type: 'integer',
            default: 3,
            minimum: 1
        },
        notification_type: {
            title: 'Notification type',
            type: 'string',
            default: 'info',
            enum: ['success', 'info', 'warning', 'error', 'fatal error']
        }
    }
}
