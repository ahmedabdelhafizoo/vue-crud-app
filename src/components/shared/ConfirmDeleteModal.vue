<template>
  <div>
    <b-modal id="confirm-delete-modal" hide-footer hide-header centered>
      <h6 class="mt-3">{{ modalTitle }}</h6>
      <div>
        <button
          class="mt-3 mr-2 btn btn-link"
          @click="$bvModal.hide('confirm-delete-modal')"
        >
          No
        </button>
        <button class="mt-3 btn btn-link text-danger" @click="confirmDelete">
          Yes
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ConfirmDeleteModal",
  props: ["modalTitle"],
  methods: {
    confirmDelete() {
      this.$emit("confirmDelete");
    }
  }
};
</script>
