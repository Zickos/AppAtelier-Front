// composables/useCrud.js
import { ref, onMounted } from "vue";

export function useCrud({ fetchFn, updateFn, deleteFn }) {
  const items = ref([]);
  const showUpdateModal = ref(false);
  const selectedItem = ref(null);
  const showConfirm = ref(false);
  const itemToDelete = ref(null);

  const loadItems = async () => {
    try {
      const res = await fetchFn();
      items.value = res.data.data;
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  onMounted(loadItems);

  const handleEdit = (item) => {
    selectedItem.value = item;
    showUpdateModal.value = true;
  };

  const closeUpdate = () => {
    selectedItem.value = null;
    showUpdateModal.value = false;
  };

  const handleUpdate = async (updatedItem) => {
    try {
      await updateFn(updatedItem.id, updatedItem);
      await loadItems();
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    } finally {
      closeUpdate();
    }
  };

  const handleDelete = (item) => {
    itemToDelete.value = item;
    showConfirm.value = true;
  };

  const handleCancel = () => {
    itemToDelete.value = null;
    showConfirm.value = false;
  };

  const handleConfirm = async () => {
    try {
      await deleteFn(itemToDelete.value.id);
      await loadItems();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    } finally {
      handleCancel();
    }
  };

  const selectedDetailsItem = ref(null);

  const handleShowDetails = (item) => {
    selectedDetailsItem.value = item;
    /* console.log(selectedDetailsItem.value) */
  };

  const closeDetails = () => {
    selectedDetailsItem.value = null;
  };

  return {
    items,
    showUpdateModal,
    selectedItem,
    showConfirm,
    itemToDelete,
    selectedDetailsItem, 
    loadItems,
    handleEdit,
    closeUpdate,
    handleUpdate,
    handleDelete,
    handleCancel,
    handleConfirm,
    handleShowDetails, 
    closeDetails, 
  };
}
