export const chapters = [
  { id: 'introduction', route: '/introduction', label: 'Introduction', doorId: 'DOOR_01', cameraTarget: 'ROOM_01', roomType: 'placeholder' },
  { id: 'experience', route: '/experience', label: 'Experience', doorId: 'DOOR_02', cameraTarget: 'ROOM_02', roomType: 'placeholder' },
  { id: 'work', route: '/work', label: 'Selected Work', doorId: 'DOOR_03', cameraTarget: 'ROOM_03', roomType: 'placeholder' },
  { id: 'engineering', route: '/engineering', label: 'Engineering', doorId: 'DOOR_04', cameraTarget: 'ROOM_04', roomType: 'placeholder' },
  { id: 'approach', route: '/approach', label: 'Approach', doorId: 'DOOR_05', cameraTarget: 'ROOM_05', roomType: 'placeholder' },
  { id: 'contact', route: '/contact', label: 'Contact', doorId: 'DOOR_06', cameraTarget: 'FINAL_ROOM', roomType: 'placeholder' },
]

export const getChapter = (id) => chapters.find((chapter) => chapter.id === id)
