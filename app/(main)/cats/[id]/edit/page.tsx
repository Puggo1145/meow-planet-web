import { EditCatForm } from "../_components/edit-cat-form"

const EditCatPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <EditCatForm catId={params.id} />
      </div>
    </div>
  )
}

export default EditCatPage 