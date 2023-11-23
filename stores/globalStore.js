import { create } from 'zustand';

export const useGlobalStore = create((set) => ({

	showButtonGroup: false,

	toggleShowButtonGroup: () => {
		set((state) => ({
			showButtonGroup: !state.showButtonGroup
		}));
	},

	setShowButtonGroup: (value) => {
		set((state) => ({
			showButtonGroup: value
		}));
	}



}));