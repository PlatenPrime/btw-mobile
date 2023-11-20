export interface RowType {
	_id: {
		$oid: string;
	};
	title: string;
	pallets: Array<{
		$oid: string;
	}>;
	__v: number;
}