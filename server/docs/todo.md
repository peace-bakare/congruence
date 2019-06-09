# Models

*User:*
  - email: string
  - password: string

*Employee:*
  - fullname: string
  - nickname: string
  - projects: [#project]

*Project:*
  - title: string
  - desc: string
  - media: [#media]

*Media:*
  - src: string