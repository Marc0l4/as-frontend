'use client'

import * as apiGroup from '@/api/adminGroup'
import * as apiPeople from '@/api/adminPeople'
import { Group } from '@/types/Group'
import { useEffect, useState } from 'react'
import { GroupItemNotFound, GroupItemPlaceholder } from '../groups/GroupItem'
import { People } from '@/types/People'
import {
  PersonItem,
  PersonItemNotFound,
  PersonItemPlaceholder,
} from './PersonItem'
import { PersonAdd } from './PersonAdd'
import { PersonEdit } from './PersonEdit'

type Props = {
  eventId: number
}

export const EventTabPeople = ({ eventId }: Props) => {
  // groups
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroupId, setSelectedGroupId] = useState(0)
  const [groupLoading, setGroupLoading] = useState(true)

  const loadGroups = async () => {
    setSelectedGroupId(0)
    setGroupLoading(true)
    const groupList = await apiGroup.getGroups(eventId)
    setGroupLoading(false)
    setGroups(groupList)
  }

  useEffect(() => {
    loadGroups()
  }, [])

  // people
  const [people, setPeople] = useState<People[]>()
  const [peopleLoading, setPeopleLoading] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<People | null>()

  const loadPeople = async () => {
    setSelectedPerson(null)
    if (selectedGroupId <= 0) return false
    setPeople([])
    setPeopleLoading(true)
    const peopleList = await apiPeople.getPeople(eventId, selectedGroupId)
    setPeopleLoading(false)
    setPeople(peopleList)
  }

  const handleEditButton = (person: People) => {
    setSelectedPerson(person)
  }

  useEffect(() => {
    loadPeople()
  }, [selectedGroupId])

  return (
    <div className="">
      <div className="my-3">
        {!groupLoading && groups.length > 0 && (
          <select
            className="w-full bg-gray-800 p-3 text-xl text-white outline-none"
            onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
          >
            <option value={0}>Selecione um grupo</option>
            {groups.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>
        )}
        {groupLoading && <GroupItemPlaceholder />}
        {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
      </div>
      {selectedGroupId > 0 && (
        <>
          <div className="my-3 border border-dashed p-3">
            {!selectedPerson && (
              <PersonAdd
                eventId={eventId}
                groupId={selectedGroupId}
                refreshAction={loadPeople}
              />
            )}
            {selectedPerson && (
              <PersonEdit person={selectedPerson} refreshAction={loadPeople} />
            )}
          </div>
          {!peopleLoading &&
            people &&
            people?.length > 0 &&
            people?.map((i) => (
              <PersonItem
                key={i.id}
                item={i}
                refreshAction={loadPeople}
                onEdit={handleEditButton}
              />
            ))}
          {peopleLoading && (
            <>
              <PersonItemPlaceholder />
              <PersonItemPlaceholder />
            </>
          )}
          {!peopleLoading && people?.length === 0 && <PersonItemNotFound />}
        </>
      )}
    </div>
  )
}
