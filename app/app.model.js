// need refine into several files

module.exports = {
  deviceType: 'desktop',
  browserName: '',
  css:{
    bodyScroll: 0,
    bShowSide: false
  },
  sideBarModel: {

  },
  bAuthed: false,
  navBarModel: {
    currentTab: ''
  },
  bLoginPage: false,
  treeNodeSelected: '',
  bLoading: false,
  passageRelatedInfo: {
    createdAt: '',
    updatedAt: '',
    passageType: ''
  },
  arrPassageTypes: [],
  arrPassages: [],
  arrResume: [],
  arrEducation: [],
  arrJob: [],
  arrProject: [],
  newResume: {
    id: '',
    title: '',
    name: '',
    birthday: '',
    phone: '',
    email: '',
    wechat: '',
    qq: '',
    selfAssignment: ''
  },
  newPassage: {
    id: '',
    title: '',
    tag: '',
    content: '',
    passageTypeId: ''
  },
  newEducation: {
    id: '',
    from: '',
    to: '',
    name: '',
    major: '',
    description: ''
  },
  newJob: {
    id: '',
    from: '',
    to: '',
    name: '',
    title: '',
    description: ''
  },
  newProject: {
    id: '',
    from: '',
    to: '',
    name: '',
    technology: '',
    description: '',
    responsibility: ''
  },
  arrRecord: [],
  newRecord: {
    id: '',
    content: '',
    eventDate: ''
  },
  arrRecordImage: []
}
