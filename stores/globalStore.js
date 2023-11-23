import { create } from 'zustand';

export const useGlobalStore = create((set) => ({

	showButtonModal: false,

	toggleShowButtonModal: () => {
		set((state) => ({
			showButtonModal: !state.showButtonModal
		}));
	}


}));