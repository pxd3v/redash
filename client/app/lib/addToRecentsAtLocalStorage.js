function getIndexOfItemInArray (list, id, objectType) {
  const filteredArray = list.map(item => item.object_type === objectType ? item : {object_id: undefined});
  const arrayOnlyWithIds = filteredArray.map(item => item.object_id)
  return arrayOnlyWithIds.indexOf(id);
}

function updateList (list, id, objectType) {
  const itemArrayIndex = getIndexOfItemInArray(list, id, objectType);
  const itemIsAlreadyOnTheList = itemArrayIndex !== -1;
  if(itemIsAlreadyOnTheList)
    list.splice(itemArrayIndex, 1);
  list.unshift({object_id: id, object_type: objectType});
  return list;
}

export default function addToRecentsAtLocalStorage(id, objectType) {
  const currentList = localStorage.getItem("recents");
  if(!currentList){
    localStorage.setItem("recents", JSON.stringify([{object_id: id, object_type: objectType}]));
    return;
  }
  const parsedCurrentList = JSON.parse(currentList);
  const updatedList = updateList(parsedCurrentList, id, objectType);
  localStorage.setItem("recents", JSON.stringify(updatedList));
}
