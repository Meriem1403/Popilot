import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'event';
  time?: string;
  participants?: string[];
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  
  // Données d'exemple - à intégrer avec les réunions existantes
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Réunion de lancement POPY',
      date: new Date(2026, 0, 20),
      type: 'meeting',
      time: '14:00',
      participants: ['Jean Dupont', 'Marie Martin', 'Pierre Dubois'],
      description: 'Kickoff du projet POPY'
    },
    {
      id: '2',
      title: 'Revue de conception',
      date: new Date(2026, 0, 22),
      type: 'meeting',
      time: '10:00',
      participants: ['Jean Dupont', 'Sophie Bernard']
    },
    {
      id: '3',
      title: 'Livraison prototype V1',
      date: new Date(2026, 0, 25),
      type: 'deadline',
      priority: 'high',
      description: 'Date limite pour la livraison du premier prototype'
    },
    {
      id: '4',
      title: 'Formation équipe',
      date: new Date(2026, 0, 28),
      type: 'event',
      time: '09:00',
      description: 'Formation sur les nouveaux outils'
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'meeting' as 'meeting' | 'deadline' | 'event',
    time: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Jours du mois suivant
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date: Date) => {
    const now = new Date();
    return date.getDate() === now.getDate() &&
           date.getMonth() === now.getMonth() &&
           date.getFullYear() === now.getFullYear();
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.date),
      type: newEvent.type,
      time: newEvent.time || undefined,
      description: newEvent.description || undefined,
      priority: newEvent.type === 'deadline' ? newEvent.priority : undefined
    };
    
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({
      title: '',
      date: '',
      type: 'meeting',
      time: '',
      description: '',
      priority: 'medium'
    });
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'event': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'deadline': return AlertCircle;
      case 'event': return CalendarIcon;
      default: return CalendarIcon;
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendrier & Planning</h1>
          <p className="text-gray-600 mt-1">Réunions, événements et échéances importantes</p>
        </div>
        <button
          onClick={() => setShowEventModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvel événement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Navigation du calendrier */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={today}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Aujourd'hui
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Grille du calendrier */}
            <div className="p-6">
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Jours du mois */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day.date);
                  const isTodayDate = isToday(day.date);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={`min-h-24 p-2 rounded-lg border cursor-pointer transition-all ${
                        day.isCurrentMonth
                          ? 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                          : 'bg-gray-50 border-gray-100'
                      } ${
                        isTodayDate ? 'ring-2 ring-indigo-500' : ''
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                      } ${
                        isTodayDate ? 'text-indigo-600 font-bold' : ''
                      }`}>
                        {day.date.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded ${getEventColor(event.type)} text-white truncate`}
                            title={event.title}
                          >
                            {event.time && <span className="mr-1">{event.time}</span>}
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 px-2">
                            +{dayEvents.length - 2} autre(s)
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Panneau latéral - Événements à venir */}
        <div className="space-y-6">
          {/* Légende */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Légende</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <span className="text-sm text-gray-700">Réunions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-red-500"></div>
                <span className="text-sm text-gray-700">Échéances</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <span className="text-sm text-gray-700">Événements</span>
              </div>
            </div>
          </div>

          {/* Prochains événements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Prochains événements</h3>
            <div className="space-y-3">
              {events
                .filter(event => event.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map(event => {
                  const EventIcon = getEventIcon(event.type);
                  return (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                        <EventIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                          <CalendarIcon className="w-3 h-3" />
                          {event.date.toLocaleDateString('fr-FR')}
                          {event.time && (
                            <>
                              <Clock className="w-3 h-3 ml-1" />
                              {event.time}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <h3 className="font-semibold mb-4">Ce mois-ci</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-indigo-100">Réunions</span>
                <span className="text-2xl font-bold">
                  {events.filter(e => e.type === 'meeting' && e.date.getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-100">Échéances</span>
                <span className="text-2xl font-bold">
                  {events.filter(e => e.type === 'deadline' && e.date.getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-100">Événements</span>
                <span className="text-2xl font-bold">
                  {events.filter(e => e.type === 'event' && e.date.getMonth() === currentDate.getMonth()).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nouvel événement */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">Nouvel événement</h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ex: Réunion d'équipe..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="meeting">Réunion</option>
                    <option value="deadline">Échéance</option>
                    <option value="event">Événement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {newEvent.type !== 'deadline' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heure (optionnel)
                  </label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}

              {newEvent.type === 'deadline' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priorité
                  </label>
                  <select
                    value={newEvent.priority}
                    onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Ajoutez des détails..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddEvent}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
