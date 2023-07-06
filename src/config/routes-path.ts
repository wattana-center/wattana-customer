const RoutesPath = {
  HOME: '/',
  NEWS: {
    INDEX: '/news',
    DETAIL: '/news/:id'
  },
  BLOG: {
    INDEX: '/blog',
    MANAGE: '/blog-manage'
  },
  PRIVACY_POLICY: '/privacy-policy',
  AUTHEN: {
    INDEX: '/login',
    SING_IN: '/signin',
    SIGN_OUT: '/signout',
    RESET_PASSWORD: '/resetpassword',
    SIGN_UP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
    CONFIRM_EMAIL: '/confirm-email'
  },
  PROFILE: {
    INDEX: '/profile',
    HISTORY: '/profile/history',
    MANAMENT: '/profile/booking'
  },
  BOOKING: {
    INDEX: '/booking',
    DETAIL: '/booking/{id}',
    INFO: '/booking/{id}/info',
    PAYMENT: '/booking/{id}/payment',
    CONFIRM: '/booking/{id}/confirm'
  },
  ADMIN: {
    INDEX: '/admins',
    NEWS: {
      INDEX: '/admins/news',
      DATA: '/admins/news/data',
      Edit: '/admins/news/edit/:id',
      ADD: '/admins/news/add',
      DETAIL: '/admins/news/data/:id'
    },
    BLOG: {
      INDEX: '/admins/blog',
      ADD: '/admins/blog/add',
      DATA: '/admins/blog/data'
    },
    USERS: {
      INDEX: '/admins/users'
    },
    BANNER: {
      INDEX: '/admins/banner',
      ADD: '/admins/blog/add',
      DATA: '/admins/blog/data'
    },
    BUSINESS: {
      INDEX: '/admins/business',
      ADD: '/admins/business/add',
      DATA: '/admins/business/data',
      EDIT: '/admins/business/edit/:id',
      DETAIL: '/admins/business/data/:id'
    }
  }
}

export { RoutesPath }
