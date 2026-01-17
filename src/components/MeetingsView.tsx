import { useState } from 'react';
import {
  Plus,
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle,
  AlertCircle,
  Edit,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { CreateMeetingModal } from './CreateMeetingModal';
import { MeetingReportModal } from './MeetingReportModal';
import { calculateCurrentWriter, calculateNextWriter } from '../types/meetings';

export function MeetingsView() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Configuration de la rotation
  const rotation = {
    id: 'rotation-1',
    projectId: 'popy',
    membersOrder: ['user-1', 'user-2', 'user-3', 'user-4'], // Mériem → Alice → Thomas → Paul
    memberNames: ['Mériem Alami', 'Alice Chevalier', 'Thomas Serrano', 'Paul Leblanc'],
    periodDays: 15,
    startDate: '2026-01-01',
  };

  // Calcul du rédacteur actuel et suivant
  const currentWriterId = calculateCurrentWriter(rotation, new Date().toISOString());
  const currentWriterIndex = rotation.membersOrder.indexOf(currentWriterId);
  const currentWriterName = rotation.memberNames[currentWriterIndex];
  
  const nextWriter = calculateNextWriter(rotation, currentWriterId);
  const nextWriterIndex = rotation.membersOrder.indexOf(nextWriter.nextWriterId);
  const nextWriterName = rotation.memberNames[nextWriterIndex];

  const meetings = [
    {
      id: 1,
      number: 12,
      title: 'Sprint Review #12 - POPY',
      date: '2026-01-17',
      time: '14:00',
      duration: 120,
      participants: 8,
      writerId: 'user-2',
      writerName: 'Alice Chevalier',
      status: 'planned',
      hasReport: false,
      projectName: 'POPY',
      decisions: 0,
      actions: 0,
    },
    {
      id: 2,
      number: 11,
      title: 'Sprint Review #11 - POPY',
      date: '2026-01-03',
      time: '14:00',
      duration: 90,
      participants: 8,
      writerId: 'user-1',
      writerName: 'Mériem Alami',
      status: 'completed',
      hasReport: true,
      projectName: 'POPY',
      decisions: 4,
      actions: 12,
    },
    {
      id: 3,
      number: 10,
      title: 'Comité Pilotage POPY',
      date: '2025-12-20',
      time: '10:00',
      duration: 120,
      participants: 10,
      writerId: 'user-3',
      writerName: 'Thomas Serrano',
      status: 'completed',
      hasReport: true,
      projectName: 'POPY',
      decisions: 7,
      actions: 8,
    },
    {
      id: 4,
      number: 9,
      title: 'Revue Technique Hardware',
      date: '2025-12-15',
      time: '15:00',
      duration: 60,
      participants: 5,
      writerId: 'user-4',
      writerName: 'Paul Leblanc',
      status: 'completed',
      hasReport: true,
      projectName: 'POPY',
      decisions: 3,
      actions: 6,
    },
  ];

  const upcomingMeetings = meetings.filter((m) => m.status === 'planned');
  const pastMeetings = meetings.filter((m) => m.status === 'completed');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateReport = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowReportModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Réunions & Comptes Rendus</h1>
          <p className="text-gray-600 mt-1">
            Traçabilité ISO 9001 - Décisions & Actions documentées
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Planifier une réunion
        </button>
      </div>

      {/* Système de rotation automatique */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-600 text-white rounded-lg">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 text-lg mb-3">
              Rotation automatique du rédacteur (tous les {rotation.periodDays} jours)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700 mb-1">Rédacteur actuel</div>
                <div className="text-xl font-bold text-purple-900">{currentWriterName}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Période en cours jusqu'au {nextWriter.startDate}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700 mb-1">Prochain rédacteur</div>
                <div className="text-xl font-bold text-purple-900">{nextWriterName}</div>
                <div className="text-xs text-gray-500 mt-1">
                  À partir du {nextWriter.startDate}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-purple-800">
              <CheckCircle className="w-4 h-4" />
              <span>
                Ordre de rotation :{' '}
                {rotation.memberNames.map((name, idx) => (
                  <span key={idx}>
                    {idx > 0 && ' → '}
                    <strong className={name === currentWriterName ? 'text-purple-900' : ''}>
                      {name}
                    </strong>
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Réunions planifiées</p>
              <p className="text-2xl font-bold text-blue-600">{upcomingMeetings.length}</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-600 bg-blue-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CR publiés</p>
              <p className="text-2xl font-bold text-green-600">{pastMeetings.length}</p>
            </div>
            <FileText className="w-10 h-10 text-green-600 bg-green-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Décisions tracées</p>
              <p className="text-2xl font-bold text-purple-600">
                {pastMeetings.reduce((acc, m) => acc + m.decisions, 0)}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-purple-600 bg-purple-100 p-2 rounded-lg" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actions créées</p>
              <p className="text-2xl font-bold text-orange-600">
                {pastMeetings.reduce((acc, m) => acc + m.actions, 0)}
              </p>
            </div>
            <AlertCircle className="w-10 h-10 text-orange-600 bg-orange-100 p-2 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Réunions à venir */}
      {upcomingMeetings.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-blue-50">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Réunions à venir
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingMeetings.map((meeting) => {
              const daysUntil = Math.ceil(
                (new Date(meeting.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              const isToday = daysUntil === 0;
              const isSoon = daysUntil <= 2 && daysUntil > 0;

              return (
                <div
                  key={meeting.id}
                  className={`border-2 rounded-xl p-6 ${
                    isToday
                      ? 'border-blue-500 bg-blue-50'
                      : isSoon
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm text-gray-500">#{meeting.number}</span>
                        <h3 className="text-lg font-bold text-gray-900">{meeting.title}</h3>
                        {isToday && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-semibold">
                            AUJOURD'HUI
                          </span>
                        )}
                        {isSoon && (
                          <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                            DANS {daysUntil}J
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(meeting.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.time} ({meeting.duration} min)
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {meeting.participants} participants
                        </span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full border border-purple-200 font-medium">
                          📝 Rédacteur : {meeting.writerName}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {meeting.projectName}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCreateReport(meeting)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Rédiger CR
                      </button>
                    </div>
                  </div>

                  {/* Notifications pour le rédacteur */}
                  {meeting.writerName === currentWriterName && (
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-yellow-900">
                            Vous êtes le rédacteur de cette réunion
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            {daysUntil === 0
                              ? '📝 Trame prête, remplissez pendant la réunion'
                              : daysUntil === 1
                              ? '⚠️ Demain : préparez-vous à rédiger le CR'
                              : `Rédaction du CR dans ${daysUntil} jours`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Historique des réunions */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            Historique des comptes rendus
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réunion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rédacteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Décisions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pastMeetings.map((meeting) => (
                <tr key={meeting.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-500">#{meeting.number}</span>
                      <div>
                        <div className="font-medium text-gray-900">{meeting.title}</div>
                        <div className="text-xs text-gray-500">{meeting.projectName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(meeting.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {meeting.writerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                      {meeting.decisions} décisions
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      {meeting.actions} actions
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                      {meeting.status === 'completed' ? 'Publié' : 'En cours'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && <CreateMeetingModal onClose={() => setShowCreateModal(false)} />}
      {showReportModal && selectedMeeting && (
        <MeetingReportModal
          meeting={selectedMeeting}
          onClose={() => {
            setShowReportModal(false);
            setSelectedMeeting(null);
          }}
        />
      )}
    </div>
  );
}
